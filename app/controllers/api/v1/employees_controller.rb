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
    respond_to do |format|
      if @employee.save
        format.json { render json: @employee }
      else
        format.html { redirect_to root_path }
        format.json { render json: {errors: @employee.errors}, status: :unprocessable_entity }
      end
    end
  end

  private

  def employee_params
    params.require(:employee).permit(:name, :cpf, :admission_date, :email, :address, :weight, :height, :meditation_hours, :client_id, :selected_offers)
  end
end
