from flask import Blueprint, jsonify, request
from settings import API_ENDPOINT_PRODUTO
from funcoes import Funcoes

bp_produto = Blueprint('produto', __name__, url_prefix="/api/produto") 
# --- Rotas da API do Backend (que serão consumidas pelo React) ---
# Rota para Listar todos os Funcionários (READ - All)
@bp_produto.route('/all', methods=['GET'])
def get_produtos():
    # chama a função para fazer a requisição à API externa
    response_data, status_code = Funcoes.make_api_request('get', API_ENDPOINT_PRODUTO)
    # retorna o json da resposta da API externa
    return jsonify(response_data), status_code

# Rota para Obter um Funcionário Específico (READ - One)
@bp_produto.route('/one', methods=['GET'])
def get_produto():
    # obtém o ID do funcionário a partir dos parâmetros de consulta da URL
    id_produto = request.args.get('id_produto')
    # valida se o id_produto foi passado na URL
    if not id_produto:
        return jsonify({"error": "O parâmetro 'id_produto' é obrigatório"}), 400
    # chama a função para fazer a requisição à API externa
    response_data, status_code = Funcoes.make_api_request('get', f"{API_ENDPOINT_PRODUTO}{id_produto}")# retorna o json da resposta da API externa
    return jsonify(response_data), status_code

# Rota para Criar um novo Funcionário (POST)
@bp_produto.route('/', methods=['POST'])
def create_produto():
    # verifica se o conteúdo da requisição é JSON
    if not request.is_json:
        return jsonify({"error": "Requisição deve ser JSON"}), 400
    # obtém o corpo da requisição JSON
    data = request.get_json()
    # validação básica para ver se os campos foram informados no json
    required_fields = ['nome', 'descricao', 'valor_unitario', 'foto']
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Campos obrigatórios faltando: {required_fields}"}), 400
    # chama a função para fazer a requisição à API externa
    response_data, status_code = Funcoes.make_api_request('post', API_ENDPOINT_PRODUTO, data=data)
    # retorna o json da resposta da API externa
    return jsonify(response_data), status_code

# Rota para Atualizar um Funcionário existente (PUT)
@bp_produto.route('/', methods=['PUT'])
def update_produto():
    # verifica se o conteúdo da requisição é JSON
    if not request.is_json:
        return jsonify({"error": "Requisição deve ser JSON"}), 400
    # obtém o corpo da requisição JSON
    data = request.get_json()
    # validação básica para ver se os campos foram informados no json
    required_fields = ['id_produto', 'nome', 'descricao', 'valor_unitario', 'foto']
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Campos obrigatórios faltando: {required_fields}"}), 400
    # chama a função para fazer a requisição à API externa
    response_data, status_code = Funcoes.make_api_request('put', f"{API_ENDPOINT_PRODUTO}{data.get('id_produto')}", data=data)# retorna o json da resposta da API externa
    return jsonify(response_data), status_code

# Rota para Deletar um Funcionário (DELETE)
@bp_produto.route('/', methods=['DELETE'])
def delete_produto():
    # obtém o ID do funcionário a partir dos parâmetros de consulta da URL
    id_produto = request.args.get('id_produto')
    # valida se o id_produto foi passado na URL
    if not id_produto:
        return jsonify({"error": "O parâmetro 'id_produto' é obrigatório"}), 400
    # chama a função para fazer a requisição à API externa
    response_data, status_code = Funcoes.make_api_request('delete', f"{API_ENDPOINT_PRODUTO}{id_produto}")# retorna o json da resposta da API externa
    return jsonify(response_data), status_code
