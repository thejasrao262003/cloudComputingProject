pipeline {
    agent any    
    stages {
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Log in to Docker Hub
                    bat 'docker login -u thejasrao2003 -p "KingKohli" https://index.docker.io/v1/'
                    
                    // Build and push Docker images for each deployment
                    dockerImagePush('nginx', 'latest')
                    dockerImagePush('thejasrao2003/mircro_services-client', 'latest')
                    dockerImagePush('thejasrao2003/mircro_services-user', 'latest')
                    dockerImagePush('thejasrao2003/mircro_services-product', 'latest')
                    dockerImagePush('thejasrao2003/mircro_services-order', 'latest')
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Apply Kubernetes deployment
                    sh "kubectl apply -f kubernetes_deployment.yaml"
                    
                    // Apply Kubernetes services
                    sh "kubectl apply -f kubernetes_services.yaml"
                    
                    // Port forward services for debugging
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
def dockerImagePush(imageName, imageTag) {
    def customImage = docker.build(imageName, "-f ${imageName}/Dockerfile .")
    customImage.tag("${imageName}:${imageTag}")
    customImage.push()
}
