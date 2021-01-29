class Api::V1::ClientsController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def index
    @clients = Client.all
    render json: @clients
  end

end