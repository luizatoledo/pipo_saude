class Api::V1::ClientsController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def index
    @clients = Client.all
    clients_with_partners = @clients.map do |c|
      {client: c, client_partners: c.partners}
    end
    render json: clients_with_partners
  end
end