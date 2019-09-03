Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
        resources :users, only: [:index, :create, :update, :show]
        resources :papers, only:  [:index, :show, :create, :update]
        resources :reviews, only:  [:index, :create]
        get '/validate', to: 'auth#validate_token'
        post "/signin", to: "auth#create"
        get '/profile', to: 'users#profile' 
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
