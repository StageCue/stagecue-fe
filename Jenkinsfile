pipeline {

    environment {
        GIT_REPO_URL = 'https://github.com/StageCue/stagecue-fe.git'
        GIT_CREDENTIALS = credentials("github_personal_access_token")
    }

    agent any

    stages {
        stage('Cloning Github repository branch') {

            steps {
                script {

                echo 'cloning git repository...'
                git branch: "${env.BRANCH_NAME}",
                url: "${env.GIT_REPO_URL}",
                credentialsId: "${env.GIT_CREDENTIALS}"

                echo "Cloned successfully ${env.BRANCH_NAME} repository."
                }
            }
        }

        stage('Node.js 설치') {
            steps {
                echo "Node.js 설치 중..."
                sh """
                curl -sL https://deb.nodesource.com/setup_16.x | bash -
                apt-get install -y nodejs
                node -v
                npm -v
                """
            }
        }

         stage('종속성 설치') {
            steps {
                echo "Yarn 설치 중..."
                script {
                    def yarnInstalled = sh(script: "command -v yarn", returnStatus: true)
                    if (yarnInstalled != 0) {
                        sh """
                        curl -o- -L https://yarnpkg.com/install.sh | bash
                        export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
                        """
                        env.PATH = "$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$env.PATH"
                    }
                }
                echo "종속성 설치 중..."
                sh "yarn"
                echo "종속성을 성공적으로 설치했습니다."
            }
        }

        stage('Build') {
            steps {
                echo "entering repository directory..."
                 dir('stagecue-fe') 
                 echo "build application..."
                sh "yarn build"

                echo "Build successfully application."
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "build docker image..."
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