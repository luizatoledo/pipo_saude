class Api::V1::EmployeesController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def index
    @employees = Employee.all
    employees_with_offers = @employees.map do |e|
      {attributes: e, 
      available_offers: e.client.contracts.map do |c|
        c.partner.offers
      end.flatten
      }
    end
    render json: employees_with_offers
  end

  def create
    @employee = Employee.new(employee_params)
    @employee.save
    render json: @employee
  end

  private

  def employee_params
    params.require(:employee).permit(:name, :cpf, :admission_date, :email, :address, :weight, :height, :meditation_hours, :client_id, :selected_offers)
  end
end
