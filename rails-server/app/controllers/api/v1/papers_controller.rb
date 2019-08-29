class Api::V1::PapersController < ApplicationController

    def index
        @papers = Paper.all
        render(  json: Api::V1::PaperSerializer.new(@papers)  )
    end

    def show
        @paper = Paper.find(params[:id])
        render( json: Api::V1::PaperSerializer.new(@paper) )
    end

    private
    def paper_params
        params.require(:paper).permit(:id, :title, :abstract, :category)
    end

end
