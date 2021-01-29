class Api::V1::ClientsController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def index
    @clients = Client.all
    render json: @clients
  end

  def show
    @client = Client.find(params[:id])
    client_with_partners = { client: @client, client_partners: @client.partners}
    render json: [client_with_partners]
  end

end