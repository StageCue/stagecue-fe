pipeline {

    environment {
       GIT_REPO_URL = 'https://github.com/StageCue/stagecue-fe.git'
       GIT_CREDENTIALS = credentials("github-jenkins")
       DOCKERHUB_CREDENTIALS = credentials("dockerhub-jenkins")
       DOCKER_IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
       DOCKERHUB_REPO = 'beomseokchoi/stagecue-fe'

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
                docker.withRegistry("https://registry.hub.docker.com", "dockerhub-jenkins") {
           
                    echo "Pushing Docker Image...."
                    sh "   docker push ${env.DOCKERHUB_REPO}:${env.DOCKER_IMAGE_TAG} "
                     echo "Pushed Docker image Dockerhub sccessfully."
                    
                    }
                }
            }
        }
        
    

        stage("Cleaning up Docker image") {
            steps {
                echo "Cleaning up Docker image..."
                sh "docker rmi ${env.DOCKERHUB_REPO}:${env.DOCKER_IMAGE_TAG}"
                echo "Cleaned up successfully Dcoker image"
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

        stage('main branch: deploly to prod server') {
            when {
                branch "main"
            }
            steps {
                echo 'test: deploy main branch...'
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