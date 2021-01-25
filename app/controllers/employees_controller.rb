class EmployeesController < ApplicationController
  def show
    @employee = Employee.find(params[:id])
  end

  def new
    @employee = Employee.new
  end

  def create
    @employee = Employee.new(employee_params)
    if @dentist.after_save
      redirect_to employee_path(@employee)
    else
      render :new
    end
  end

  private

  def employee_params
    params.require(:employee).permit(:name, :cpf, :admission_date, :email, :address, :weight, :height, :meditation_hours, :client_id)
  end
end
