pipeline {

    environment {
       GIT_REPO_URL = 'https://github.com/StageCue/stagecue-fe.git'
       GIT_CREDENTIALS = credentials("github-jenkins")

       DOCKERHUB_CREDENTIALS = credentials("dockerhub-jenkins")
       DOCKER_IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
       DOCKERHUB_REPO = 'beomseokchoi/stagecue-fe'

       PROD_SERVER = "129.154.49.243"
       PROD_USER = "ubuntu"
       STG_SERVER = "146.56.113.170"
       STG_USER = "stagecue"       
        test_text = "qwefqwef"
    }

    agent any

    tools {
        nodejs 'nodejs-22.5.1'
    }


    stages {
        stage("Checking Node.js Version") {
            steps {
                echo "checking node.js..."
                sh "node --version"
            }
        }

        stage('Cloning Github repository branch') {

            steps {
                script {

                echo 'cloning git repository...'
                git branch: "${env.BRANCH_NAME}",
                url: "${env.GIT_REPO_URL}",
                credentialsId: "${env.GIT_CREDENTIALS}"

                echo "Cloned ${env.BRANCH_NAME} repository successfully."
                }
            }
        }

      

         stage('Installing dependencies') {
            steps {
                script {
                    echo "installing dependencies..."
                    yarn "install"
                    echo "Installed successfully dependencies"
                }
            }
        }

        stage('Building application') {
            steps {
                script {
                    echo "building applicaiton..."
                    echo "build application..."
                    yarn "build"
                    echo "Built application successfully."
                }
            }
        }

        stage('Build Docker Image') {
            steps {

                    echo "build docker image..."
                    sh "docker build -t ${env.DOCKERHUB_REPO}:${env.DOCKER_IMAGE_TAG} ."
                    echo "Built Docker image successfully."
                }
            }
        

        stage("Pushing Docker Image to Dockerhub"){
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId:"dockerhub-jenkins", usernameVariable: "USERNAME", passwordVariable: "PASSWORD" )]) {
                        echo "Pushing Docker Image...."
                        sh "docker login -u $USERNAME -p $PASSWORD"
                        sh "docker push ${env.DOCKERHUB_REPO}:${env.DOCKER_IMAGE_TAG}"
                        echo "Pushed Docker image Dockerhub sccessfully."
                    }
                }
            }
        }
        



        stage('release branch: deploy to stage server') {
            when {
                branch "release"
            }
            steps {
                echo 'test: deploy release branch...'
            }
        }

        stage('Deplolying to prod server(main branch)') {
            when {
                branch "main"
            }
            steps {
                sshagent (credentials: ["prod"]) {
                    echo 'deploying application to prod server...'
                  
                        withCredentials([usernamePassword(credentialsId:"dockerhub-jenkins", usernameVariable: "USERNAME", passwordVariable: "PASSWORD" )]) {
                            sh """
                                ssh ${PROD_USER}@${PROD_SERVER} << 'EOF'
                                docker stop stagecue-fe || true
                                docker rm stagecue-fe || true
                                echo $PASSWORD | docker login -u $USERNAME --password-stdin
                                docker pull ${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG}
                                docker run --platform linux/amd64 -d --name stagecue-fe -p 4000:80 ${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG}
                            """
                        }
                    
                  
                    echo "Deployed application successfully on 80 port."
                }
            }

        }   

        stage("Cleaning up Docker image") {
            steps {
                echo "Cleaning up Docker image..."
                sh "docker rmi ${env.DOCKERHUB_REPO}:${env.DOCKER_IMAGE_TAG}"
                echo "Cleaned up Docker image successfully."
            }
        }

        stage("Check Running Docker Containers") {
            steps {
                echo "Checking for running Docker containers..."
                sh "docker ps -a"
            }
        }
    }

    post {
        success {
            echo "success"
            }
        failure {
            echo "fail"
        }
    }
}