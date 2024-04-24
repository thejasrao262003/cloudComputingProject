pipeline {
    agent any
    environment{
        dockerhubuser = 'thejasrao2003'
        
        DOCKERHUB_CREDENTIALS = credentials('thejasrao2003')
    }
    stages {
        stage('Checkout source') {
            steps {
                git branch: 'main', url: 'https://github.com/thejasrao262003/cloudComputingProject.git'
                echo 'git clone completed'
            }
        }
        stage('Docker Login') {
           steps {
               echo 'Logon in to docker hub'
               sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin docker.io'
               echo 'Login Successfull'
           }
       }
        stage('Verify Docker Installation') {
            steps {
                sh 'docker --version'
                sh 'docker info'
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Build Docker images from the specified directories
                    sh 'docker build -t thejasrao2003/mircro_services-client -f client/Dockerfile client/'
                    sh 'docker build -t thejasrao2003/mircro_services-user -f server/userManagement/Dockerfile server/userManagement/'
                    sh 'docker build -t thejasrao2003/mircro_services-product -f server/productManagement/Dockerfile server/productManagement/'
                    sh 'docker build -t thejasrao2003/mircro_services-order -f server/orderManagement/Dockerfile server/orderManagement/'
                    
                    // Run Docker containers
                    sh 'docker run -d -p 3000:3000 thejasrao2003/mircro_services-client'
                    sh 'docker run -d -p 5001:5001 thejasrao2003/mircro_services-user'
                    sh 'docker run -d -p 5002:5002 thejasrao2003/mircro_services-product'
                    sh 'docker run -d -p 5003:5003 thejasrao2003/mircro_services-order'
                    sh 'docker ps -a'
                }
            }
        }
        
    //     stage('Deploy to Kubernetes') {
    //         steps {
    //             script {
    //                 sh "minikube start"
    //                 sh "kubectl apply -f kubernetes_deployment.yaml"
    //                 sh "kubectl apply -f kubernetes_services.yaml"
    //                 sh "kubectl port-forward service/nginx-deployment 80:80 &"
    //                 sh "kubectl port-forward service/client-deployment 3000:3000 &"
    //                 sh "kubectl port-forward service/user-management-deployment 5001:5001 &"
    //                 sh "kubectl port-forward service/product-management-deployment 5002:5002 &"
    //                 sh "kubectl port-forward service/order-management-deployment 5003:5003 &"
    //             }
    //         }
    //     }
    }
    
    post {
        failure {
            echo 'Pipeline failed'
        }
    }
}
