class Api::V1::ClientsController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def index
    @clients = Client.all
    clients_with_partners = @clients.map do |c|
      {client: c, client_partners: c.partners}
    end
    render json: clients_with_partners
  end

  def show
    @client = Client.find(params[:id])
    client_with_partners = { client: @client, client_partners: @client.partners}
    render json: [client_with_partners]
  end

end