## Introduction

Open [production buld](https://pardubicky-hacker.vercel.app/) for demo.



## Features

- Landing page
    - sometimes gets stuck on loading
    - three js canvas with the mask
    - custom text writing animation
    - custom console component(with routing capabilities)
- /examples
    - r3f shader background
    - ssr 
- /examples/create
    - tool for easy example creation - integrates with the testing backend 
    - instructions are general for all languages the backend handles the heavy lifting
- /examples/[id]
    - vs codes monaco editor
    - chat bot with context of the instruction the code in the editor and history **the bot is forbidden to write code by the system promot it only hint to the correct solution**
    - md parsed with code parsing capabilities | *im having some problems with it will fix in future release*
    - **future**
        - figma like note making interface
        - possible notes maybe not nescessary 
        - leader board *important*
        - improve terminal to make the fails more pronounced
- /api
    - /assistant
        - very close to production, im happy with how it works
    - /run
        - need for a lot of error handeling and makeing code cleaner
        - only js is currnetly supported for testing will change within a few days
        - all languages can be run using the backend 2
    - /submit
        currently a dummy wil inherit most of the code from run and will be able to set the finish time for the user

- authentication 
    - postgress trigger to create user in public scheema
    - google and github oauth2
    - email with otp and sexy input component

## Backend 2
[link](https://github.com/Jacob-CZ/code_exe_v2)
- not good at all 
- starts a docker container for each request
- code times out using a shell script
- if the code in the container is infinite it is not killable using the api has to be killed from within using the shell script
- shell script for building all the containers one for each lang
- /[lang]
    - handles the code running 

## Notable libraries
- supabase **used for authentication and all db needs**
- framer motion **used for animating some elments**
- r3f **used for all rendering needs and also drei is used**\
- nextui and shadcn/ui **ui libraries the app suppoerts themes**
- live blocks + unchosen web rtc stream provider for live seminars in a scrimba like enviromnet potentiali peerjs(scalability conserns)
- zustand **state management accross components**
- middleware regex matching for role management currently turned off for demos withou a account 

## new routes planed in future releases  (witing a week)
- /seminar **live seminars**
- /compete **similar to examples but with leader boards scored based on time and attempts**
- /liveCompete **monthly competition starting at a given time like google code jam**
- /leaderboards **various datatables with scores**
- /[userId] **account management, solved problems rank**
- /lessons **prerecorded scrimba like lessons in czech**
- /news **programing,competition,delta related news**

