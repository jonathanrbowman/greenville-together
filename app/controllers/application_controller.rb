class ApplicationController < ActionController::Base
  def auth_admin_user!
    return true if valid_auth_cases

    if current_user.present?
      redirect_to admin_dashboard_path
    else
      redirect_to root_path
    end
  end

  private

  def valid_auth_cases
    return true if controller_name == 'users' && action_name == 'create'
    return false if current_user.blank?
    return true if current_user.is_admin
    return true if controller_name == 'dashboard'
    return true if controller_name == 'users' && current_user.id == params[:id].to_i

    return false
  end
end
