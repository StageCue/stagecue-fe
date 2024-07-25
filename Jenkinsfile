pipeline {

    environment {
        GIT_REPO_URL = 'https://github.com/StageCue/stagecue-fe.git'
        GIT_CREDENTIALS = credentials("github_personal_access_token")
        repository = "beomseokchoi/stagecue-fe"
        DOCKERHUB_CREDENTIALS = credentials("beomseokchoi/stagecue-fe")
        
        dockerImage = ""
    }

    agent any

    stages {
        stage('Cloning Github repository: main branch') {
            when {
                branch "main"
            }

            steps {
                echo 'cloning main branch'
                git branch: "main",
                url: ${env.GIT_REPO_URL}
                credentialsId: ${env.GIT_CREDENTIALS},
            }
        }

        stage("Cloning Github repository: release branch") {
            when {
                branch "release"
            }

            step {
                echo "cloning release branch..."
                steps {
                echo 'cloning git repository, main branch'
                git branch: "main",
                url: ${env.GIT_REPO_URL}
                credentialsId: ${env.GIT_CREDENTIALS},
            }
        }


        stage('Install Dependencies') {
            steps {
                echo "installing dependencies..."
                sh "yarn"
            }
        }

        stage('Build') {
            steps {
                 echo "build application..."
                sh "yarn build"
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "yarn build"
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

        post {
            success {
                echo "success"
                }
            unsuccessful {
                error "fail"
                }
            }
        
        }
    }
}