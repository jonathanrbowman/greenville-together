module ActiveAdmin
  module Devise
    def self.controllers
      {
        sessions: "admin/sessions",
        passwords: "active_admin/devise/passwords",
        unlocks: "active_admin/devise/unlocks",
        registrations: "active_admin/devise/registrations",
        confirmations: "active_admin/devise/confirmations"
      }
    end
  end
end