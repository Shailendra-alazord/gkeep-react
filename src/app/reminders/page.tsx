import ColorPalette from '@/components/colorPalatte/colorPalette';
import DisplayProvider from '@/Providers/DisplayProvider';
import Header from '@/components/header/header';

export default function Page() {
  return (
    <DisplayProvider>
      <Header />
      <main className="reminders">
        <div>This will the reminders</div>
        <ColorPalette note={{ color: 'default' }} />
      </main>
    </DisplayProvider>
  );
}
