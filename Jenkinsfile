pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                echo 'building the application...'
            }
        }
        stage('build') {
            steps {
                echo 'testing the application...'
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
}