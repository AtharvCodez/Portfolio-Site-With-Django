from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100)  # FontAwesome icon class
    color = models.CharField(max_length=50, blank=True)  # icon color

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    tools = models.CharField(max_length=200)
    link = models.URLField()
    github_link = models.URLField(blank=True, null=True)

    def get_tools_list(self):
        return self.tools.split(',')

    def __str__(self):
        return self.title


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    topic = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name