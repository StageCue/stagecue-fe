pipeline {
    environment {
        GIT_REPO_URL = 'https://github.com/StageCue/stagecue-fe.git'
        GIT_CREDENTIALS = credentials("github_personal_access_token")
        repository = "beomseokchoi/stagecue-fe"
        DOCKERHUB_CREDENTIALS = credentials("dockerhub_cred_id")  // DockerHub 자격 증명 ID 업데이트
        dockerImage = ""
    }

    agent any

    stages {
        stage('Clone Repository') {
            parallel {
                stage('Cloning Github repository: main branch') {
                    when {
                        branch "main"
                    }
                    steps {
                        echo 'Cloning main branch...'
                        git branch: "main",
                            url: "${env.GIT_REPO_URL}",
                            credentialsId: "${env.GIT_CREDENTIALS}"
                        echo 'Cloning main branch completed'
                    }
                }
                
                stage('Cloning Github repository: release branch') {
                    when {
                        branch "release"
                    }
                    steps {
                        echo "Cloning release branch..."
                        git branch: "release",
                            url: "${env.GIT_REPO_URL}",
                            credentialsId: "${env.GIT_CREDENTIALS}"
                        echo 'Cloning release branch completed'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies..."
                sh "yarn"
                echo "Dependencies installed"
            }
        }

        stage('Build') {
            steps {
                echo "Building application..."
                sh "yarn build"
                echo "Build completed"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    // Create Dockerfile
                    writeFile file: 'Dockerfile', text: """
                    FROM nginx:alpine
                    COPY build /usr/share/nginx/html
                    EXPOSE 80
                    CMD ["nginx", "-g", "daemon off;"]
                    """
                    echo "Dockerfile created"

                    // Build Docker image
                    dockerImage = docker.build("${env.repository}:${env.BRANCH_NAME}")
                    echo "Docker image built: ${dockerImage.imageName()}"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "Pushing Docker image..."
                    docker.withRegistry('', "${env.DOCKERHUB_CREDENTIALS}") {
                        dockerImage.push()
                    }
                    echo "Docker image pushed"
                }
            }
        }

        stage('Deploy') {
            parallel {
                stage('Release Branch: Deploy to Stage Server') {
                    when {
                        branch "release"
                    }
                    steps {
                        echo 'Deploying release branch...'
                        // Add deployment steps here
                        echo 'Release branch deployed'
                    }
                }

                stage('Main Branch: Deploy to Prod Server') {
                    when {
                        branch "main"
                    }
                    steps {
                        echo 'Deploying main branch...'
                        // Add deployment steps here
                        echo 'Main branch deployed'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded!"
        }
        failure {
            echo "Pipeline failed."
        }
    }
}