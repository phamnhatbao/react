import Layout from '../components/Layout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';

function Testing(): JSX.Element {
  const notify = () => toast('Testing');
  return (
    <Layout>
      <>
        {/*<style>*/}
        {/*  {`a {*/}
        {/*    color: red;*/}
        {/*  }`}*/}
        {/*</style>*/}
        <button onClick={notify}>Notify!</button>
        {/*<a href='javascript:void(0);'>Something here</a>*/}
        <CKEditor
          editor={ClassicEditor}
          data='<p>Hello from CKEditor 5!</p>'
          onReady={(editor: any) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event: any, editor: any) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event: any, editor: any) => {
            console.log('Focus.', editor);
          }}
        />
      </>
    </Layout>
  );
}

export default Testing;
