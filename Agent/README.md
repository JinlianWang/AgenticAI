# 运行方法

确保使用的 Python 版本 >=3.12，并且在当前目录下创建虚拟环境并安装依赖（例如 `python -m venv .venv && source .venv/bin/activate && pip install -e .`）。

然后在当前目录下，新建一个叫做 .env 的文件，输入以下内容：

```
OPENAI_API_KEY=xxx
# 可选：如果想使用自定义模型，设置 OPENAI_MODEL（默认 gpt-4.1-mini）
# OPENAI_MODEL=gpt-4.1-mini
```

xxx 是你在 OpenAI 平台申请到的 API Key，可以在 https://platform.openai.com/ 的 API Keys 页面创建。

完成上述步骤后，进入到当前文件所在目录，然后执行以下命令即可启动：

```bash
python agent.py snake
```
