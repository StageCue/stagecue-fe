pipeline {
    environment {
        GIT_REPO_URL = 'https://github.com/StageCue/stagecue-fe.git'
        GIT_CREDENTIALS = credentials("github_personal_access_token")
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