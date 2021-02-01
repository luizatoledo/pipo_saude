class EmployeesController < ApplicationController
  def show
    @employee = Employee.find(params[:id])
    
    @employee_offers = []
    @employee.client.contracts.each do |c|
      c.partner.offers.to_a.each { |offer| @employee_offers << offer.name}
    end
    
    # @info = [] 
    # @employee_offers.each do |o|
    #   o[0].registration_data.each { |d| @info << JSON.parse(d).symbolize_keys!}
    # end
    # @info = @info.uniq
  end
end
