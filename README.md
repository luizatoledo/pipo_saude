# Pipo Saúde Employee Registration App
***
## Project Description
This project simulates a registration form for new employees that will benefit from health insurance.

[See Online](https://pipo-saude-luizatoledo.herokuapp.com/ "Pipo Saúde Project")

## Screenshots and Videos
![screenshot](screenshot.PNG)

![laptop](gif_laptop_screen.gif)

## Tech and Framework

* Ruby on Rails
* React.js
* HTML
* SCSS
* PostgreSQL
* Git and GitHub

## Installation

### Check Ruby Version
```
ruby -v
```
Output should be something like ```ruby 2.6.6p146```
If not, install the right ruby version using [rbenv](https://github.com/rbenv/rbenv):
```
rbenv install 2.6.6
```
Set 2.6.6 version as default
```
rbenv global 2.6.6
```
Restart terminal
### Install Rails
```
gem install rails -v 6.0
```
Restart terminal
### Clone Repository
```
git clone git@github.com:luizatoledo/sallve_cart.git
cd sallve_cart
```
### Install Gems and Dependencies
Using [Bundler](https://github.com/rubygems/bundler) and [Yarn](https://github.com/yarnpkg/yarn):
```
bundle
yarn
```
### Initialize Database
```
rails db:create db:migrate
rails db:seed
```
### Serve
```
rails s
webpack-dev-server
```
Go to localhost:3000 in browser

## Credits
Rails app generated with [lewagon/rails-templates](https://github.com/lewagon/rails-templates), created by the [Le Wagon coding bootcamp](https://www.lewagon.com) team.
