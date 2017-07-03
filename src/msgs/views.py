from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.core import serializers
from django.template.loader import render_to_string
from django.shortcuts import render, get_object_or_404
import json
from django.utils import timezone
from .models import Mensagem
from .form import MensagemForm

def msgs_list(request):
    mensagens = Mensagem.objects.filter(criadoEm__lte=timezone.now()).order_by('-criadoEm')
    return render(request, 'list.html', { 'mensagens': mensagens })

def msg_get(request):
    getid = request.GET.get('id', None)
    msg = Mensagem.objects.get(pk=getid)
    data = serializers.serialize('json', msg)
    return data

def msg_detalhes(request):
    getid = request.GET.get('id', None)
    msg = Mensagem.objects.get(pk=getid)
    data = {
        'status': False,
        'msg': msg.mensagem
    }
    if data['msg']:
        data['status'] = True
        return JsonResponse(data)
    else:
        return JsonResponse(data)

def save_mensagem_form(request,form, template_name):
    data = dict()
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            data['isValid'] = True
            msgs = Mensagem.objects.filter(criadoEm__lte=timezone.now()).order_by('-criadoEm')
            data['list_msgs'] = render_to_string('includes/partial_msgs_list.html', {
                'mensagens': msgs
            })
        else:
            data['isValid'] = False

    data['isValid'] = True
    context = {'form': form}
    data['html_form'] = render_to_string('includes/partial_form_msg.html', context, request=request)
    return JsonResponse(data)

def msg_edit(request, pk):
    msg = get_object_or_404(Mensagem, pk=pk)

    if request.method == 'POST':
        form = MensagemForm(request.POST, instance=msg)
    else:
        form = MensagemForm(instance=msg)
    return save_mensagem_form(request, form, 'includes/partial_form_msg.html')
    
def msg_create(request):
    data = dict()

    if request.method == 'POST':
        form = MensagemForm(request.POST)
    else:
        form = MensagemForm()
    return save_mensagem_form(request, form, 'includes/partial_form_msg.html')

def msg_del(request, pk):
    data = dict()
    msg = get_object_or_404(Mensagem, pk=pk)
    if request.method == 'POST':
        msg.delete()
        data['isValid'] = True
        msgs = Mensagem.objects.filter(criadoEm__lte=timezone.now()).order_by('-criadoEm')
        data['list_msgs'] = render_to_string('includes/partial_msgs_list.html', {
            'mensagens': msgs
        })
    else:
        data['isValid'] = false
    return  JsonResponse(data)