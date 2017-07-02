from django.db import models
from django.utils import timezone

class Mensagem(models.Model):
    mensagem = models.CharField(max_length=200)
    usuario = models.ForeignKey('auth.User')
    criadoEm = models.DateTimeField(default=timezone.now)

    def salvar(self):
        self.save()

    def __str__(self):
        strData = '{}-{}-{}'.format(self.criadoEm.day, self.criadoEm.month, self.criadoEm.year)
        return '[{}] {}'.format(strData, self.mensagem)
        
#return '[%s] %s'.format('{:{dfmt}}'.format(self.criadoEm, dfmt='%d-%m-%y'), self.mensagem)