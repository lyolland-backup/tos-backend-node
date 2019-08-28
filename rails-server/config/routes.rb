Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
        resources :users, only: [:index, :create, :update]
        # get "/signup", to: 'users#index'
        get '/validate', to: 'auth#validate_token'
        post "/signin", to: "auth#create"
        get '/profile', to: 'users#profile'

        # resources :researcher_papers
        resources :reviews
        resources :papers, only:  [:index]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
