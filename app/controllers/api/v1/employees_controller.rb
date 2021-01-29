class Api::V1::EmployeesController < ActionController::Base
  skip_before_action :verify_authenticity_token
  def index
    @employees = Employee.all
    render json: @employees
  end

  def show
    @employee = Employee.find(params[:id])
    render json: @employee
  end

  def create
    @employee = Employee.new(employee_params)
    binding.pry
    @employee.save
    render json: @employee
  end

  private

  def employee_params
    params.require(:employee).permit(:name, :cpf, :admission_date, :email, :address, :weight, :height, :meditation_hours, :client_id)
  end
end

