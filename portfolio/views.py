from .models import Skill, Project
from django.shortcuts import render, redirect
from .models import Contact
from django.http import JsonResponse


def home(request):

    skills = Skill.objects.all()
    projects = Project.objects.all()

    context = {
        'skills': skills,
        'projects': projects
    }

    return render(request, 'portfolio/index.html', context)

def contact_submit(request):

    if request.method == "POST":

        name = request.POST.get("name")
        email = request.POST.get("email")
        topic = request.POST.get("topic")
        message = request.POST.get("message")

        Contact.objects.create(
            name=name,
            email=email,
            topic=topic,
            message=message
        )

        return redirect("home")
