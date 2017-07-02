########################################################
### Django Tutorial ####################################
########################################################

# Requirements:
    - Python >= 3.5.3
    - Django >= 1.8.5

# 1. Definindo o diretório
     Defina o diretório onde o site vai ficar
      - ex.: 
        [WINDOWS] -- C:\django\site\
        [UNIX] ----- ~/django/site/

# 2. Configurando o ambiente (virtualenv)
     O virtualenv nos ajuda a manter o ambiente de desenvolvimento organizado, é uma forma de isolar configurações de uma aplicação de se propagarem em outros projetos.

     No cmd ou terminal (Unix):

     	[WINDOWS] -- C:\django\site> C:\[LOCAL_INSTALACAO_PYTHON]\python -m venv [NOME_DO_AMBIENTE]
	[UNIX] ----- ~/django/site$ python3 -m venv [NOME_DO_AMBIENTE]

# 3. Executando virtualenv
     Após executar o comando acima, será criado um novo diretório com o nome do nosso ambiente. Para executar o ambiente digite:

	[WINDOWS] -- C:\django\site> [NOME_AMBIENTE]\Scripts\activate
	[UNIX] ----- ~/django/site$ source [NOME_AMBIENTE]/bin/activate

	Obs.: 
	[UNIX] . [NOME_AMBIENTE]/bin/activate
	Somente em caso do comando source não estiver disponível.

# 4. Instalando o Django
     Para instalar o Django utilizaremos o comando pip, salvamos também um arquivo com as especificações das versões para evitar futuros problemas posteriores.

	pip install django==1.8.5 whitenoise==2.0

     Salvando configurações no arquivo requirements.txt

	pip freeze > requirements.txt

# 5. Criando o projeto
     Agora criamos o nosso projeto

        [WINDOWS] python [NOME_AMBIENTE]\Scripts\django-admin.py startproject [NOME_SITE]
        [UNIX] django-admin startproject [NOME_SITE] .

     Após executar o comando, a estrutura do nosso site ficará assim:

        site
          ├─── manage.py
          └─── [NOME_SITE]
                 settings.py
                 urls.py
                 wsgi.py
                 __init__.py

        [manage.py] Script que fará o gerenciamento do site, iniciar um servidor web, entre outros.
        [settings.py] Configuração do site
        [urls.py] Script de mapeamento de rotas do site

# 6. Banco de dados
     O banco de dados será o sqlite3, dentro do script settings.py ele já vem configurado basta darmos um comando para ele instalar.

        [WINDOWS / UNIX] python manage.py migrate

# 7. Servidor web
     Com as configurações prontas, iniciamos o servidor web.

        python manage.py runserver

        http://127.0.0.1/8000/

# 8. Criando um app
     Para manter as coisas organizas, criamos um app para os nossas entidades (models)

        python manage.py startapp [NOME_APP]

     Após executar o comando um novo diretório será adicionado ao projeto.
     Para que a nossa aplicação reconheça o app criado precisamos alterar o script settings.py no trecho:
        INSTALLED_APPS = (
            ... # outros apps do projeto
            ...
            , [NOME_APP]
        )

     Com o app criado, vamos ao arquivo models.py e colocamos a nossa classe.
     Para sincronizar o nosso modelo com o banco de dados executamos o comando:

        python manage.py makemigrations blog .

# 9. CRUD mensagens
     Alterar o arquivo msgs/admin.py

	from django.contrib import admin
	from .models import Mensagem
	
	admin.site.register(Mensagem)

	Acessar a url http://127.0.0.1/admin
	Configurar usuario

	python manage.py createsuperuser
