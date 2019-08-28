class Api::V1::PapersController < ApplicationController

    def index
        render( { json: Api::V1::PaperSerializer.new(Paper.all) } )
    end


end
