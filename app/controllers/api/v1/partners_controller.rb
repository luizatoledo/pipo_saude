class Api::V1::PartnersController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def index
    @partners = Partner.all
    render json: @partners
  end

end