pipeline {
    agent any
    
    stages {
        stage('Checkout source') {
            steps {
                git branch: 'main', url: 'https://github.com/thejasrao262003/cloudComputingProject.git'
                echo 'git clone completed'
            }
        }
        
        stage('Verify Docker Installation') {
            steps {
                sh 'docker --version'
                sh 'docker info'
            }
        }
        
        stage('Build and Push Docker Images') {
            steps {
            //     sh 'docker build -t thejasrao2003/nginx -f nginx/Dockerfile .'
                sh 'docker build -t thejasrao2003/mircro_services-client -f mircro_services-client/Dockerfile .'
                sh 'docker build -t thejasrao2003/mircro_services-user -f mircro_services-user/Dockerfile .'
                sh 'docker build -t thejasrao2003/mircro_services-product -f mircro_services-product/Dockerfile .'
                sh 'docker build -t thejasrao2003/mircro_services-order -f mircro_services-order/Dockerfile .'

                sh 'docker push thejasrao2003/nginx:latest'
                sh 'docker push thejasrao2003/mircro_services-client:latest'
                sh 'docker push thejasrao2003/mircro_services-user:latest'
                sh 'docker push thejasrao2003/mircro_services-product:latest'
                sh 'docker push thejasrao2003/mircro_services-order:latest'
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh "minikube start"
                    sh "kubectl apply -f kubernetes_deployment.yaml"
                    sh "kubectl apply -f kubernetes_services.yaml"
                    sh "kubectl port-forward service/nginx-deployment 80:80 &"
                    sh "kubectl port-forward service/client-deployment 3000:3000 &"
                    sh "kubectl port-forward service/user-management-deployment 5001:5001 &"
                    sh "kubectl port-forward service/product-management-deployment 5002:5002 &"
                    sh "kubectl port-forward service/order-management-deployment 5003:5003 &"
                }
            }
        }
    }
    
    post {
        failure {
            echo 'Pipeline failed'
        }
    }
}
