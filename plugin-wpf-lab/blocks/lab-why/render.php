<?php
/**
 * Render template for wpf/lab-why.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$eyebrow      = isset( $attributes['eyebrow'] )      ? $attributes['eyebrow']      : '';
$title_p1     = isset( $attributes['titlePart1'] )   ? $attributes['titlePart1']   : '';
$title_violet = isset( $attributes['titleViolet'] )  ? $attributes['titleViolet']  : '';
$title_p2     = isset( $attributes['titlePart2'] )   ? $attributes['titlePart2']   : '';
$title_acid   = isset( $attributes['titleAcid'] )    ? $attributes['titleAcid']    : '';
$title_p3     = isset( $attributes['titlePart3'] )   ? $attributes['titlePart3']   : '';
$body         = isset( $attributes['body'] )         ? $attributes['body']         : '';
$pull_tag     = isset( $attributes['pullTag'] )      ? $attributes['pullTag']      : '';
$pull_quote   = isset( $attributes['pullQuote'] )    ? $attributes['pullQuote']    : '';
$pull_author  = isset( $attributes['pullAuthor'] )   ? $attributes['pullAuthor']   : '';
$note_text    = isset( $attributes['noteText'] )     ? $attributes['noteText']     : '';
$note_ref     = isset( $attributes['noteRef'] )      ? $attributes['noteRef']      : '';

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-why alignfull',
) );
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="wpf-lab-why__grid">
        <div class="wpf-lab-why__left">
            <p class="wpf-lab-why__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
            <h2 class="wpf-lab-why__title">
                <?php echo esc_html( $title_p1 ); ?>
                <span class="wpf-lab-why__op"><?php echo esc_html( $title_violet ); ?></span>
                <?php echo esc_html( $title_p2 ); ?>
                <br>
                <span class="wpf-lab-why__hl"><?php echo esc_html( $title_acid ); ?></span>
                <?php echo esc_html( $title_p3 ); ?>
            </h2>
            <p class="wpf-lab-why__body"><?php echo esc_html( $body ); ?></p>
            <div class="wpf-lab-why__pull">
                <p class="wpf-lab-why__pull-tag"><?php echo esc_html( $pull_tag ); ?></p>
                <p class="wpf-lab-why__pull-quote"><?php echo esc_html( $pull_quote ); ?></p>
                <p class="wpf-lab-why__pull-author"><?php echo esc_html( $pull_author ); ?></p>
            </div>
        </div>
        <div class="wpf-lab-why__right">
            <div class="wpf-lab-why__fig-head">
                <p class="wpf-lab-why__fig-title">FIG.01 · MÉTHODE 07 · LA RETENUE</p>
                <p class="wpf-lab-why__fig-meta">PLUGIN · wpf-lab v1.1 · 2026.05.21</p>
            </div>
            <div class="wpf-lab-why__capture">
                <div class="wpf-lab-why__ruler-top"><span>0</span><span>360</span><span>720</span><span>1080</span><span>1440</span></div>
                <div class="wpf-lab-why__capture-frame">
                    <p class="wpf-lab-why__frame-caption">test.wpformation.com/methode-blocs-php-custom</p>
                    <div class="wpf-lab-why__frame-overlay"><span>block.json · 11 attrs · autoGenerateControl</span></div>
                </div>
                <div class="wpf-lab-why__score">
                    <div class="wpf-lab-why__score-head">
                        <p class="wpf-lab-why__score-label">★ SCORE · MÉTHODE 07</p>
                        <p class="wpf-lab-why__score-total">5.0<span class="max">/ 5</span></p>
                    </div>
                    <?php
                    $rows = array(
                        array( 'ÉDITABILITÉ',     '5.0', '100%' ),
                        array( 'DESIGN',          '5.0', '100%' ),
                        array( 'INDÉPENDANCE',    '5.0', '100%' ),
                        array( 'REPRODUCTIBILITÉ','5.0', '100%' ),
                    );
                    foreach ( $rows as $row ) :
                    ?>
                        <div class="wpf-lab-why__score-row">
                            <p><?php echo esc_html( $row[0] ); ?></p>
                            <div class="wpf-lab-why__score-bar"><div class="wpf-lab-why__score-bar-fill" style="width:<?php echo esc_attr( $row[2] ); ?>"></div></div>
                            <p class="val"><?php echo esc_html( $row[1] ); ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <div class="wpf-lab-why__footnote">
        <p><span class="wpf-lab-why__note-key"><?php echo esc_html( substr( $note_text, 0, 10 ) ); ?></span><?php echo esc_html( substr( $note_text, 10 ) ); ?></p>
        <p><?php echo esc_html( $note_ref ); ?></p>
    </div>
</section>
