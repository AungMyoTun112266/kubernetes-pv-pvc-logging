

minikube ssh
sudo mkdir -p /mnt/logs/product /mnt/logs/sale
sudo chmod -R 777 /mnt/logs
exit


cd product-service
docker build -t product-service:3.0.0 .
minikube image load product-service:3.0.0

cd ../sale-service
docker build -t sale-service:3.0.0 .
minikube image load sale-service:3.0.0


kubectl apply -f kubernetes/pv-product.yaml
kubectl apply -f kubernetes/pv-sale.yaml


helm install product-service helm/node-ts-k8s -f helm/node-ts-k8s/values-product.yaml
helm install sale-service helm/node-ts-k8s -f helm/node-ts-k8s/values-sale.yaml


minikube service node-ts-k8s-3001 --url
minikube service node-ts-k8s-3002 --url




