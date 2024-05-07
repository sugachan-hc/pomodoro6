class ApplicationController < ActionController::Base
  if Rails.env.production? || ENV["RESCUE_EXCEPTIONS"]
    rescue_from StandardError, with: :rescue_internal_server_error
    rescue_from ActiveRecord::RecordNotFound, with: :rescue_not_found
    rescue_from ActionController::ParameterMissing, with: :rescue_bad_request
  end

  private def rescue_bad_request(exception)
    render "errors/bad_request", status: 400, formats: [:html]
  end

  private def rescue_not_found(exception)
    render "errors/not_found", status: 404, formats: [:html]
  end

  private def rescue_internal_server_error(exception)
    render "errors/internal_server_error", status: 500, formats: [:html]
  end
end
