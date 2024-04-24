pipeline {
    agent any
    
    stages {
        stage('Checkout source') {
            steps {
                git branch: 'main', url: 'https://github.com/thejasrao262003/cloudComputingProject.git'
                echo 'git clone completed'
            }
        }
        
        stage('Install Docker') {
            steps {
                script {
                    sh 'curl -fsSL https://get.docker.com -o get-docker.sh'
                    sh 'sh get-docker.sh'
                }
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
                script {
                    docker.build('thejasrao2003/nginx', '-f nginx/Dockerfile .').push('latest')
                    docker.build('thejasrao2003/mircro_services-client', '-f mircro_services-client/Dockerfile .').push('latest')
                    docker.build('thejasrao2003/mircro_services-user', '-f mircro_services-user/Dockerfile .').push('latest')
                    docker.build('thejasrao2003/mircro_services-product', '-f mircro_services-product/Dockerfile .').push('latest')
                    docker.build('thejasrao2003/mircro_services-order', '-f mircro_services-order/Dockerfile .').push('latest')
                }
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

def dockerImagePush(repository, imageName, imageTag) {
    def customImage = docker.build(repository, "-f ${imageName}/Dockerfile .")
    customImage.tag("${repository}/${imageName}:${imageTag}")
    customImage.push()
}

