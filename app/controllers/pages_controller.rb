class PagesController < ApplicationController
  def home
    @employees = Employee.all
    @employees_with_offers = @employees.map do |e|
      {attributes: e, 
      available_offers: e.client.contracts.map do |c|
        c.partner.offers
      end.flatten
      }
    end
  end
end
