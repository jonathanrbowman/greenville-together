module Admin
  class SessionsController < ActiveAdmin::Devise::SessionsController

    def create
      resource = User.find_for_database_authentication(email: params[:user][:email])

      if resource.valid_password?(params[:user][:password])
        sign_in("user", resource)
        render json: {
          message: 'User sign in successfully',
          user: resource
        }, status: :ok
      else
        render json: {
          message: 'Sorry, bad request',
          errors: resource.errors.full_messages
        }, status: :bad_request
      end
    end

  end
end
