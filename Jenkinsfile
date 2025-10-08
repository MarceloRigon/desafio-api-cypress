pipeline {
  agent any

  environment {
    CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Instalar dependências') {
      steps {
        echo 'Instalando dependências do projeto...'
        sh 'npm ci || npm install'
      }
    }

    stage('Executar testes Cypress') {
      steps {
        echo 'Executando testes Cypress no modo headless...'
        sh 'npm run test:full'
      }
    }

    steps {
        echo 'Publicando relatórios JSON do Mochawesome...'
        archiveArtifacts artifacts: 'cypress/reports/**/*.json', fingerprint: true
      }
  }

  post {
    always {
      echo 'Pipeline finalizado.'
      archiveArtifacts artifacts: 'cypress/reports/**/*.*', fingerprint: true
    }
    success {
      echo '✅ Todos os testes passaram com sucesso!'
    }
    failure {
      echo '❌ Alguns testes falharam. Verifique os logs e o relatório HTML.'
    }
  }
}
