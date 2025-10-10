pipeline{
    agent any
    tools{
        nodejs  "node"
    }
    stages{
        stage("build"){
            steps{
                sh 'docker stop lepo-frontend:latest || true'
                sh 'docker rmi lepo-frontend:latest || true'
                sh 'docker build . -t lepo-frontend:latest'
            }
        }
        stage("test"){
            steps{
                echo "testing"
            }
        }
        stage("deploy"){
            steps{
                sh 'docker run -p 3000:3000 lepo-frontend:latest'
            }
        }
    }
}