pipeline{
    agent any
    tools{
        nodejs  "node"
    }
    stages{
        stage("build"){
            step{
                sh 'docker stop lepo-frontend:latest || true'
                sh 'docker rmi lepo-frontend:latest || true'
                sh 'docker build . -t lepo-frontend:latest'
            }
        }
        stage("test"){
            step{
                echo "testing"
            }
        }
        stage("deploy"){
            step{
                sh 'docker run -p 3000:3000 lepo-frontend:latest'
            }
        }
    }
}