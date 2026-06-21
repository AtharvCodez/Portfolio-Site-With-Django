from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='skills/', blank=True, null=True)

    def __str__(self):
        return self.name


class Project(models.Model):

    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    tools_used = models.CharField(max_length=200)
    link = models.URLField(blank=True)
    github_link = models.URLField(blank=True)

    def get_tools_list(self):
        return [tool.strip() for tool in self.tools_used.split(',') if tool.strip()]

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