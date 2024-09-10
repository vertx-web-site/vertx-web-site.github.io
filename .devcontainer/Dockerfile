FROM mcr.microsoft.com/devcontainers/base:noble

RUN curl https://mise.run | sh && \
  mv ~/.local/bin/mise /usr/local/bin && \
  mkdir /workspaces.tmp

WORKDIR /workspaces.tmp
USER vscode

COPY .tool-versions /workspaces.tmp
RUN mise install && echo 'eval "$(mise activate bash)"' >> ~/.bashrc
