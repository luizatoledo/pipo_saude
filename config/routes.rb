Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#home'

  # Dealing with React Routes
  get "employees/new", to: 'pages#home'
  get "employees/:id", to: 'pages#home'
 
  # API routing
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :employees, only: [ :index, :create ]
      resources :clients, only: [ :index ]
    end
  end
end
