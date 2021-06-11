class BulletinItemsController < ApplicationController
  before_action :set_bulletin_item, only: %i[ show edit update destroy ]

  # GET /bulletin_items or /bulletin_items.json
  def index
    @bulletin_items = BulletinItem.all
  end

  # GET /bulletin_items/1 or /bulletin_items/1.json
  def show
  end

  # GET /bulletin_items/new
  def new
    @bulletin_item = BulletinItem.new
  end

  # GET /bulletin_items/1/edit
  def edit
  end

  # POST /bulletin_items or /bulletin_items.json
  def create
    @bulletin_item = BulletinItem.new(bulletin_item_params)
    @bulletin_item.date ||= Date.today

    respond_to do |format|
      if @bulletin_item.save
        format.html { redirect_to @bulletin_item, notice: "Bulletin item was successfully created." }
        format.json { render :show, status: :created, location: @bulletin_item }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @bulletin_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bulletin_items/1 or /bulletin_items/1.json
  def update
    respond_to do |format|
      if @bulletin_item.update(bulletin_item_params)
        format.html { redirect_to @bulletin_item, notice: "Bulletin item was successfully updated." }
        format.json { render :show, status: :ok, location: @bulletin_item }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @bulletin_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bulletin_items/1 or /bulletin_items/1.json
  def destroy
    @bulletin_item.destroy
    respond_to do |format|
      format.html { redirect_to bulletin_items_url, notice: "Bulletin item was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bulletin_item
      @bulletin_item = BulletinItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def bulletin_item_params
      params.require(:bulletin_item).permit(:title, :body, :picture, :date, :is_active)
    end
end
