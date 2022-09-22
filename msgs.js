/* Uma função que será executada de forma assíncrona. */
async function enviarScript(scriptText){

   /* Está dividindo o script em linhas, removendo linhas vazias e pegando o elemento principal e o
   área de texto. */
    const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
    main = document.querySelector("#main"),
    textarea = main.querySelector(`div[contenteditable="true"]`)
    
    /* Está verificando se há uma área de texto, se não houver, gera um erro. */
    if(!textarea) throw new Error("Não há uma conversa aberta")
    
    /* Está iterando nas linhas do script. */
    for(const line of lines){
        console.log(line)
    
        /* Está inserindo o texto na área de texto. */
        textarea.focus();
        document.execCommand('insertText', false, line);
        textarea.dispatchEvent(new Event('change', {bubbles: true}));
    
       /* Está clicando no botão enviar. */
        setTimeout(() => {
            (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
        }, 100);
        
        /* Está esperando 250ms antes de enviar a próxima mensagem. */
        if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
    }
    
    return lines.length;
}

enviarScript(`

Olá, tudo bem? * 10



`).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error);

