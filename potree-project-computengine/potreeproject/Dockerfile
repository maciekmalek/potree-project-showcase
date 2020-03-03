# runtime enviroment
FROM python:3.7
# enable python interpreter buffer to write in stdout
ENV PYTHONUNBUFFERED 1
# ROOT DIRECTORY FOR PROJECT IN CONTAINER
RUN mkdir /potree-project
# SET WORKING DIRECTORY TO /potree-project
WORKDIR /potree-project
# COPY CONTENTS OF CURRENT DIRECTORY TO /potree-project
ADD . /potree-project
#Install dependecies
RUN pip install -r requirements.txt

