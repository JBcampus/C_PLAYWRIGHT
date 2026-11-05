pipeline {
agent any
stages {
stage('Checkout') {
steps {
checkout scm
}
}
stage('Build Docker image') {
steps {
sh 'docker build -t pw-e2e:latest .'
}
}
stage('Run tests (Docker)') {
steps {
sh '''
rm -rf artifacts || true
mkdir -p artifacts
docker run --rm --init -v "${PWD}/artifacts:/app/artifacts" pw-e2e:latest
'''
}
}
}
post {
always {
archiveArtifacts artifacts: 'artifacts/**', fingerprint: true, allowEmptyArchive: true
}
}
}