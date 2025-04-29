from modelscope import snapshot_download
 
model_path = "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"  # 阿里通义千问7B-chat模型
cache_path = "/root/autodl-tmp"   # 模型缓存路径
 
snapshot_download(model_path, cache_dir=cache_path)