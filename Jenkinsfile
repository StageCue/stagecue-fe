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

         stage('종속성 설치') {
            steps {
                echo "Yarn 설치 중..."
                sh """
                if ! command -v yarn &> /dev/null
                then
                    echo "Yarn을 찾을 수 없습니다. 설치 중..."
                    curl -o- -L https://yarnpkg.com/install.sh | bash
                    export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
                else
                    echo "Yarn이 이미 설치되어 있습니다."
                fi
                """
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